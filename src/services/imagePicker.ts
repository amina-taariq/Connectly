import {Platform} from 'react-native';
import {
  Asset,
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

export type PickedImage = {
  uri: string;
  fileName?: string | null;
  type?: string | null;
  width?: number | null;
  height?: number | null;
  fileSize?: number | null;
  asset?: Asset;
};

const defaultLibraryOptions: ImageLibraryOptions = {
  mediaType: 'photo',
  selectionLimit: 1,
  quality: 0.8,
  includeBase64: false,
};

const defaultCameraOptions: CameraOptions = {
  mediaType: 'photo',
  cameraType: 'back',
  quality: 0.8,
  saveToPhotos: Platform.OS === 'android',
  includeBase64: false,
};

function normalizeAsset(asset?: Asset): PickedImage | null {
  if (!asset?.uri) {
    return null;
  }
  return {
    uri: asset.uri,
    fileName: asset.fileName ?? null,
    type: asset.type ?? null,
    width: asset.width ?? null,
    height: asset.height ?? null,
    fileSize: asset.fileSize ?? null,
    asset,
  };
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


