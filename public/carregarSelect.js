const languagesSelect = document.getElementById("select-especialidade");

//vamos considerar que temos nossos dados em um array:
const languagesList = ["Ruby", "JavaScript", "Python", "GoLang"];

languagesList.forEach((language) => {
    option = new Option(language, language.toLowerCase());
    languagesSelect.options[languagesSelect.options.length] = option;
  });


  //Agora vamos considerar que temos nossos dados em um objeto:
/*   const languagesList = {
    ruby: "Ruby",
    javascript: "JavaScript",
    python: "Python",
    golang: "GoLang"
  };

  for(language in languagesList) {
    option = new Option(languagesList[language], language);
    languagesSelect.options[languagesSelect.options.length] = option;
  } */