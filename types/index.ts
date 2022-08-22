export interface ICharacter {
  id: number;
  name: string;
  species: string;
  gender: string;
  image: string;
  status: string;
  location:{
    name: string;
  };
  origin:{
    name: string;
  };
}