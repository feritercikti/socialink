export type ImageState = {
  selectedFile: File | null;
  isHovered: boolean;
  uploadStatus: string;
  image: string;
};

export type ImageAction =
  | { type: 'SET_SELECTED_FILE'; file: File }
  | { type: 'SET_IS_HOVERED'; isHovered: boolean }
  | { type: 'SET_UPLOAD_STATUS'; uploadStatus: string }
  | { type: 'SET_IMAGE'; image: string };

export const imageReducer = (
  state: ImageState,
  action: ImageAction
): ImageState => {
  switch (action.type) {
    case 'SET_SELECTED_FILE':
      return { ...state, selectedFile: action.file };
    case 'SET_IS_HOVERED':
      return { ...state, isHovered: action.isHovered };
    case 'SET_UPLOAD_STATUS':
      return { ...state, uploadStatus: action.uploadStatus };
    case 'SET_IMAGE':
      return { ...state, image: action.image };
    default:
      return state;
  }
};
