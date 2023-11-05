export interface ISliderImage {
  id: string;
  link: string;
}

export interface ISliderItem {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  component: string;
  backgroundImage: ISliderImage;
}

/**
 * id: string;
 * slides: ISliderItem[];
 */
export interface ISlider {
  id: string;
  slides: ISliderItem[];
}
