document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('searchBtn');
  const keywordInput = document.getElementById('keywordInput');
  const resultsDiv = document.getElementById('results');
  
  let currentPage = 1;
  let currentKeyword = '';

  async function fetchProducts(page = 1) {
    try {
      resultsDiv.innerHTML = '<div class="loader">Searching products...</div>';
      
      const response = await fetch(
        `http://localhost:3000/api/scrape?keyword=${encodeURIComponent(currentKeyword)}&page=${page}`
      );
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Failed to fetch results');
      
      renderProducts(data, page);
    } catch (error) {
      resultsDiv.innerHTML = `<div class="error">${error.message}</div>`;
    }
  }

  function renderProducts(products, page) {
    if (products.length === 0) {
      resultsDiv.innerHTML = '<div class="error">No products found</div>';
      return;
    }

    resultsDiv.innerHTML = `
      ${products.map(product => `
        <div class="product-card">
          <img src="${product.imageUrl}" alt="${product.title}" onerror="this.src='https://via.placeholder.com/250?text=Image+Not+Available'">
          <h3>${product.title}</h3>
          <p>⭐ ${product.rating} (${product.reviews} reviews)</p>
        </div>
      `).join('')}
      
      <div class="pagination">
        <button id="prevBtn" ${page === 1 ? 'disabled' : ''}>Previous</button>
        <span>Page ${page}</span>
        <button id="nextBtn">Next</button>
      </div>
    `;

    // Add event listeners for pagination
    document.getElementById('prevBtn').addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        fetchProducts(currentPage);
      }
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
      currentPage++;
      fetchProducts(currentPage);
    });
  }

  searchBtn.addEventListener('click', () => {
    const keyword = keywordInput.value.trim();
    if (!keyword) return alert('Please enter a keyword');
    
    currentKeyword = keyword;
    currentPage = 1;
    fetchProducts();
  });
});