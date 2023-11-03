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

export interface ISlider {
  id: string;
  data: ISliderItem[];
}
