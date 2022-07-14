 export default class Services {
  
    static async GetData() {
        const response = await fetch("https://localhost:7293/Books");
        const data = await response.json();
        return data;
        }

}