document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('search-form');
  const input = document.getElementById('search-input');
  const card = document.getElementById('profile-card');
  const skeleton = document.getElementById('skeleton-loader');
  const errorBanner = document.getElementById('error-banner');
  const errorMessage = document.getElementById('error-message');

  // Elements
  const avatar = document.getElementById('avatar');
  const nameEl = document.getElementById('name');
  const handleEl = document.getElementById('handle');
  const joinedDateEl = document.getElementById('joined-date');
  const bioEl = document.getElementById('bio');
  const reposEl = document.getElementById('repos');
  const followersEl = document.getElementById('followers');
  const followingEl = document.getElementById('following');
  const locationEl = document.getElementById('location');
  const companyEl = document.getElementById('company');
  const blogEl = document.getElementById('blog');
  const twitterEl = document.getElementById('twitter');

  // Format Join Date (e.g., "Joined 25 Jan 2011")
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `Joined ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  // Safe string helper
  const setField = (element, parentItem, value, isLink = false) => {
    if (value) {
      if (isLink) {
        element.href = value.startsWith('http') ? value : `https://${value}`;
        element.textContent = value;
      } else {
        element.textContent = value;
      }
      parentItem.classList.remove('inactive');
    } else {
      element.textContent = 'Not Available';
      if (isLink) element.removeAttribute('href');
      parentItem.classList.add('inactive');
    }
  };

  // Fetch from GitHub REST API
  const fetchGitHubUser = async (username) => {
    // Show Loading Skeleton
    skeleton.removeAttribute('hidden');
    card.style.display = 'none';
    errorBanner.setAttribute('hidden', '');

    try {
      const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('User does not exist on GitHub.');
        } else if (response.status === 403) {
          throw new Error('GitHub API rate limit reached. Please try again shortly.');
        } else {
          throw new Error('An error occurred while fetching user data.');
        }
      }

      const data = await response.json();

      // Populate UI with fetched data
      avatar.src = data.avatar_url;
      avatar.alt = `${data.login} avatar`;
      nameEl.textContent = data.name || data.login;
      handleEl.textContent = `@${data.login}`;
      handleEl.href = data.html_url;
      joinedDateEl.textContent = formatDate(data.created_at);
      bioEl.textContent = data.bio || 'This profile has no bio yet.';
      reposEl.textContent = data.public_repos;
      followersEl.textContent = data.followers;
      followingEl.textContent = data.following;

      // Meta Information items
      setField(locationEl, document.getElementById('item-location'), data.location);
      setField(companyEl, document.getElementById('item-company'), data.company);
      setField(blogEl, document.getElementById('item-blog'), data.blog, true);
      setField(twitterEl, document.getElementById('item-twitter'), data.twitter_username);

      // Show Card
      skeleton.setAttribute('hidden', '');
      card.style.display = 'block';

    } catch (err) {
      skeleton.setAttribute('hidden', '');
      errorMessage.textContent = err.message;
      errorBanner.removeAttribute('hidden');
    }
  };

  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (query) {
      fetchGitHubUser(query);
    }
  });

  // Load a default user on initial render
  fetchGitHubUser('octocat');
});