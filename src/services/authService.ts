// services/authService.ts
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

// Type alias for compatibility
type User = FirebaseAuthTypes.User;

export interface UserRegistrationData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  photoUri?: string;
}

export interface UserProfile {
  uid: string;
  fullName: string;
  email: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
}

class AuthService {
  // Upload avatar image to Firebase Storage
  private async uploadAvatar(uri: string, userId: string): Promise<string> {
    const reference = storage().ref(`avatars/${userId}`);
    await reference.putFile(uri);
    return await reference.getDownloadURL();
  }

  // Create user profile in Firestore
  private async createUserProfile(user: User, additionalData: any = {}) {
    const userRef = firestore().collection('users').doc(user.uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      const { displayName, email, photoURL } = user;
      const createdAt = new Date();

      const userProfile: UserProfile = {
        uid: user.uid,
        fullName: displayName || additionalData.fullName || '',
        email: email || '',
        photoURL: photoURL || additionalData.photoURL,
        createdAt,
        updatedAt: createdAt,
        ...additionalData,
      };

      await userRef.set(userProfile);
      return userProfile;
    }

    return userDoc.data() as UserProfile;
  }

  // Validate registration data
  private validateRegistrationData(data: UserRegistrationData): string | null {
    // Import validation functions from our validation utility
    const { validateRegistrationForm } = require('../utils/validation');
    
    const validationResult = validateRegistrationForm(
      data.fullName,
      data.email,
      data.password,
      data.confirmPassword
    );
    
    // Return the first error found or null if valid
    if (!validationResult.isValid) {
      return validationResult.fullName || 
             validationResult.email || 
             validationResult.password || 
             validationResult.confirmPassword || 
             'Validation failed';
    }
    
    return null;
  }

  // Register with email and password
  async registerWithEmail(
    data: UserRegistrationData,
  ): Promise<{ user: User; profile: UserProfile }> {
    try {
      // Validate input data
      const validationError = this.validateRegistrationData(data);
      if (validationError) {
        throw new Error(validationError);
      }

      // Create user account
      const userCredential = await auth().createUserWithEmailAndPassword(
        data.email.trim(),
        data.password,
      );

      const user = userCredential.user;
      let photoURL: string | undefined;

      // Upload avatar if provided
      if (data.photoUri) {
        try {
          photoURL = await this.uploadAvatar(data.photoUri, user.uid);
        } catch (uploadError) {
          console.warn('Avatar upload failed:', uploadError);
          // Continue without avatar
        }
      }

      // Update user profile
      await user.updateProfile({
        displayName: data.fullName.trim(),
        photoURL: photoURL,
      });

      // Create user profile in Firestore with offline fallback
      let profile: UserProfile;
      try {
        profile = await this.createUserProfile(user, {
          fullName: data.fullName.trim(),
          photoURL,
        });
      } catch (e: any) {
        console.warn(
          'Create user profile failed (continuing with fallback):',
          e,
        );
        const createdAt = new Date();
        profile = {
          uid: user.uid,
          fullName: data.fullName.trim(),
          email: user.email || data.email.trim(),
          photoURL,
          createdAt,
          updatedAt: createdAt,
        };
      }

      return { user, profile };
    } catch (error: any) {
      console.error('Registration error:', error);

      // Handle Firebase auth errors
      switch (error.code) {
        case 'auth/email-already-in-use':
          throw new Error('This email is already registered');
        case 'auth/invalid-email':
          throw new Error('Please enter a valid email address');
        case 'auth/weak-password':
          throw new Error('Password is too weak');
        case 'auth/network-request-failed':
          throw new Error('Network error. Please check your connection');
        default:
          throw new Error(error.message || 'Registration failed');
      }
    }
  }

  // Sign in with email and password
  async signInWithEmail(
    email: string,
    password: string,
  ): Promise<{ user: User; profile: UserProfile }> {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email.trim(),
        password,
      );

      const user = userCredential.user;

      // Try to fetch/create profile; if Firestore is offline, fallback to auth user
      let profile: UserProfile;
      try {
        const userRef = firestore().collection('users').doc(user.uid);
        const userDoc = await userRef.get();

        if (userDoc.exists()) {
          profile = userDoc.data() as UserProfile;
        } else {
          // Create profile if it doesn't exist
          profile = await this.createUserProfile(user);
        }
      } catch (e: any) {
        console.warn(
          'Fetch/create user profile failed (continuing with fallback):',
          e,
        );
        const createdAt = new Date();
        profile = {
          uid: user.uid,
          fullName: user.displayName || '',
          email: user.email || '',
          photoURL: user.photoURL || undefined,
          createdAt,
          updatedAt: createdAt,
        };
      }

      return { user, profile };
    } catch (error: any) {
      console.error('Sign-in error:', error);

      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          throw new Error('Invalid email or password');
        case 'auth/invalid-email':
          throw new Error('Please enter a valid email address');
        case 'auth/user-disabled':
          throw new Error('This account has been disabled');
        case 'auth/too-many-requests':
          throw new Error('Too many attempts. Please try again later');
        case 'auth/network-request-failed':
          throw new Error('Network error. Please check your connection');
        default:
          throw new Error('Sign-in failed. Please try again');
      }
    }
  }

  // Sign out
  async signOut(): Promise<void> {
    await auth().signOut();
  }

  // Get current user profile
  async getCurrentUserProfile(): Promise<UserProfile | null> {
    const user = auth().currentUser;
    if (!user) return null;

    try {
      const userRef = firestore().collection('users').doc(user.uid);
      const userDoc = await userRef.get();

      return userDoc.exists() ? (userDoc.data() as UserProfile) : null;
    } catch (error) {
      console.warn('Error fetching user profile:', error);
      return null;
    }
  }

  // Reset password
  async resetPassword(email: string): Promise<void> {
    try {
      await auth().sendPasswordResetEmail(email.trim());
    } catch (error: any) {
      console.error('Password reset error:', error);

      switch (error.code) {
        case 'auth/user-not-found':
          throw new Error('No account found with this email address');
        case 'auth/invalid-email':
          throw new Error('Please enter a valid email address');
        case 'auth/network-request-failed':
          throw new Error('Network error. Please check your connection');
        default:
          throw new Error('Failed to send reset email. Please try again');
      }
    }
  }
}

export default new AuthService();
