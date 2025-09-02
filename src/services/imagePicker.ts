import {Platform} from 'react-native';
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

export type PickedImage = {
  uri: string;
  fileName?: string;
  type?: string;
  width?: number;
  height?: number;
  fileSize?: number;
};

const defaultLibraryOptions: ImageLibraryOptions = {
  mediaType: 'photo',
  selectionLimit: 1,
  quality: 0.9,
  includeBase64: false,
  includeExtra: false,
  maxWidth: 1280,
  maxHeight: 1280,
  presentationStyle: Platform.OS === 'ios' ? 'overFullScreen' : undefined,
};

const defaultCameraOptions: CameraOptions = {
  mediaType: 'photo',
  cameraType: 'back',
  quality: 0.9,
  saveToPhotos: false,
  includeBase64: false,
  maxWidth: 1280,
  maxHeight: 1280,
  presentationStyle: Platform.OS === 'ios' ? 'overFullScreen' : undefined,
};

function normalizeAsset(asset?: { uri?: string; fileName?: string; type?: string; width?: number; height?: number; fileSize?: number; }): PickedImage | null {
  if (!asset?.uri) {
    return null;
  }
  const normalized: PickedImage = { uri: asset.uri };
  if (asset.fileName) normalized.fileName = asset.fileName;
  if (asset.type) normalized.type = asset.type;
  if (asset.width) normalized.width = asset.width;
  if (asset.height) normalized.height = asset.height;
  if (asset.fileSize) normalized.fileSize = asset.fileSize;
  return normalized;
}

export async function pickImageFromGallery(
  options?: ImageLibraryOptions,
): Promise<PickedImage | null> {
  const result = await launchImageLibrary({...defaultLibraryOptions, ...options});

  if (result.didCancel) {
    return null;
  }
  if (result.errorCode) {
    return null;
  }
  const asset = result.assets?.[0];
  return normalizeAsset(asset);
}

export async function captureImageFromCamera(
  options?: CameraOptions,
): Promise<PickedImage | null> {
  const result = await launchCamera({...defaultCameraOptions, ...options});

  if (result.didCancel) {
    return null;
  }
  if (result.errorCode) {
    return null;
  }
  const asset = result.assets?.[0];
  return normalizeAsset(asset);
}

export default {
  pickImageFromGallery,
  captureImageFromCamera,
};


