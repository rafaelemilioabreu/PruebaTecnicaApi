using Microsoft.AspNetCore.Mvc;

namespace PruebaTecnicaApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BooksController : ControllerBase
    {
        

        static HttpClient client = new HttpClient();
        private readonly ILogger<BooksController> _logger;

        public BooksController(ILogger<BooksController> logger)
        {
            _logger = logger;
        }

        [HttpGet("Books")]
       public async Task<List<Books>> GetBooksAsync()
        {
            List<Books> book = null;
            HttpResponseMessage response = await client.GetAsync("https://fakerestapi.azurewebsites.net/api/v1/Books");
            if (response.IsSuccessStatusCode)
            {
                 book = await response.Content.ReadFromJsonAsync<List<Books>>();
            }
            return book;
        }

        [HttpGet("Books/{id}")]
        public async Task<Books> BooksById(int id)
        {
            Books book = null;
            HttpResponseMessage response = await client.GetAsync($"https://fakerestapi.azurewebsites.net/api/v1/Books/{id}");
            if (response.IsSuccessStatusCode)
            {
                book = await response.Content.ReadFromJsonAsync<Books>();
            }
            return book;
        }

        [HttpPost("Books")]
        public async Task<Books> Create(Books book)
        {
            HttpResponseMessage response = await client.PostAsJsonAsync(
                   "https://fakerestapi.azurewebsites.net/api/v1/Books", book);
            response.EnsureSuccessStatusCode();

            // Deserialize the updated product from the response body.
            book = await response.Content.ReadFromJsonAsync<Books>();
            return book;
        }

        [HttpPut("Books/{id}")]
        public async Task<Books> Update( Books book, int id)
        {
            HttpResponseMessage response = await client.PutAsJsonAsync(
                   $"https://fakerestapi.azurewebsites.net/api/v1/Books/{id}", book);
            response.EnsureSuccessStatusCode();

            // Deserialize the updated product from the response body.
            book = await response.Content.ReadFromJsonAsync<Books>();
            return book;
        }

        [HttpDelete("Books/{id}")]
        public async Task<System.Net.HttpStatusCode> delete(int id)
        {
            
            HttpResponseMessage response = await client.DeleteAsync(
                   $"https://fakerestapi.azurewebsites.net/api/v1/Books/{id}");
            response.EnsureSuccessStatusCode();

            // Deserialize the updated product from the response body.
           
            return  response.StatusCode;
        }


    }
}