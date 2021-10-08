import fetch from "node-fetch";

export default (options) => {
  fetch("https://jsonplaceholder.typicode.com/comments").then(
    async (response) => {
      const data = await response.json();

      if (options.pretty) {
        return console.log(data);
      }

      return console.log(JSON.stringify(data));
    }
  );
};