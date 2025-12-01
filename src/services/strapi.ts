import { STRAPI_API_URL, STRAPI_URL } from '@/config/strapi';

interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiItem {
  id: number;
  attributes: any;
}

// Helper to transform Strapi response to our format
function transformStrapiItem<T>(item: StrapiItem): T & { id: string } {
  return {
    id: item.id.toString(),
    ...item.attributes,
  };
}

function getMediaUrl(media: any): string {
  if (!media?.data) return '';
  const url = media.data.attributes.url;
  // If URL is relative, prepend Strapi URL
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
}

export async function fetchAthletes() {
  try {
    const response = await fetch(`${STRAPI_API_URL}/athletes?populate=*`);
    if (!response.ok) throw new Error('Failed to fetch athletes');
    
    const json: StrapiResponse<StrapiItem[]> = await response.json();
    
    return json.data.map(item => {
      const athlete = transformStrapiItem<any>(item);
      return {
        ...athlete,
        avatar: getMediaUrl(athlete.avatar),
      };
    });
  } catch (error) {
    console.error('Error fetching athletes:', error);
    return [];
  }
}

export async function fetchAthleteById(id: string) {
  try {
    const response = await fetch(`${STRAPI_API_URL}/athletes/${id}?populate=*`);
    if (!response.ok) throw new Error('Failed to fetch athlete');
    
    const json: StrapiResponse<StrapiItem> = await response.json();
    const athlete = transformStrapiItem<any>(json.data);
    
    return {
      ...athlete,
      avatar: getMediaUrl(athlete.avatar),
    };
  } catch (error) {
    console.error('Error fetching athlete:', error);
    return null;
  }
}

export async function fetchProducts(athleteId?: string) {
  try {
    const filters = athleteId ? `?filters[athlete][id][$eq]=${athleteId}&populate=*` : '?populate=*';
    const response = await fetch(`${STRAPI_API_URL}/products${filters}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    
    const json: StrapiResponse<StrapiItem[]> = await response.json();
    
    return json.data.map(item => {
      const product = transformStrapiItem<any>(item);
      return {
        ...product,
        image: getMediaUrl(product.image),
      };
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function fetchPosts(athleteId?: string) {
  try {
    const filters = athleteId ? `?filters[athlete][id][$eq]=${athleteId}&populate=*` : '?populate=*';
    const response = await fetch(`${STRAPI_API_URL}/posts${filters}`);
    if (!response.ok) throw new Error('Failed to fetch posts');
    
    const json: StrapiResponse<StrapiItem[]> = await response.json();
    
    return json.data.map(item => {
      const post = transformStrapiItem<any>(item);
      return {
        ...post,
        image: getMediaUrl(post.image),
      };
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function fetchCauses(athleteId?: string) {
  try {
    const filters = athleteId ? `?filters[athlete][id][$eq]=${athleteId}&populate=*` : '?populate=*';
    const response = await fetch(`${STRAPI_API_URL}/causes${filters}`);
    if (!response.ok) throw new Error('Failed to fetch causes');
    
    const json: StrapiResponse<StrapiItem[]> = await response.json();
    
    return json.data.map(item => {
      const cause = transformStrapiItem<any>(item);
      return {
        ...cause,
        image: getMediaUrl(cause.image),
      };
    });
  } catch (error) {
    console.error('Error fetching causes:', error);
    return [];
  }
}

export async function fetchEvents() {
  try {
    const response = await fetch(`${STRAPI_API_URL}/events?populate=*`);
    if (!response.ok) throw new Error('Failed to fetch events');
    
    const json: StrapiResponse<StrapiItem[]> = await response.json();
    
    return json.data.map(item => transformStrapiItem(item));
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

export async function fetchTrainings(athleteId?: string) {
  try {
    const filters = athleteId ? `?filters[athlete][id][$eq]=${athleteId}&populate=*` : '?populate=*';
    const response = await fetch(`${STRAPI_API_URL}/trainings${filters}`);
    if (!response.ok) throw new Error('Failed to fetch trainings');
    
    const json: StrapiResponse<StrapiItem[]> = await response.json();
    
    return json.data.map(item => {
      const training = transformStrapiItem<any>(item);
      return {
        ...training,
        image: getMediaUrl(training.image),
      };
    });
  } catch (error) {
    console.error('Error fetching trainings:', error);
    return [];
  }
}
