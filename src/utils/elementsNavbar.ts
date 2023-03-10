export interface IElementsNavbar {
  titulo: string;
  url: string;
}

export const elementsNavbar: IElementsNavbar[] = [
  {
    titulo: "Inicio",
    url: "/",
  },
  {
    titulo: "Productos",
    url: "/products",
  },
  {
    titulo: "Compras",
    url: "/buys",
  },
];
