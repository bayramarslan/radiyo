interface RadioStation {
  name: string;
  shortname: string;
  url: string;
  homepage: string;
  icon: string;
  country: string;
  country_code: string;
  active: boolean;
  node?: RadioStation[] | undefined;
}
