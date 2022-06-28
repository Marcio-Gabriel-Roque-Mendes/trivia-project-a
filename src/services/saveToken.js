const TOKEN_KEY = 'TOKEN_KEY';

if (!JSON.parse(localStorage.getItem(TOKEN_KEY))) {
  localStorage.setItem(TOKEN_KEY, JSON.stringify([]));
}
const readToken = () => JSON.parse(localStorage.getItem(TOKEN_KEY));

const saveToken = (SavedItens) => localStorage
  .setItem(TOKEN_KEY, JSON.stringify(SavedItens));

// --------------------------------------------------------------------
// Esse codigo foi copiado do projeto trybetunes e é de autoria da trybe.
// --------------------------------------------------------------------

export const getToken = () => {
  const SavedItens = readToken();
  return SavedItens;
};

export const addToken = (Item) => {
  if (Item) {
    const SavedItens = readToken();
    saveToken([...SavedItens, Item]);
  }
};
