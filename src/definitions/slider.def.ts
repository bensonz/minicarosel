export interface ISliderImage {
  id: string;
  url: string;
  metaData: Record<string, any>;
}

export interface ISliderItem {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  component: string;
  bgImage: ISliderImage;
}

/**
 * id: string;
 * slides: ISliderItem[];
 */
export interface ISlider {
  id: string;
  slides: ISliderItem[];
}
