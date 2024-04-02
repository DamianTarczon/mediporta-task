import apiUrl from "../api/apiUrl.ts";

const fetchTags = async (
  rowsPerPage: number,
  page: number,
  sortValue: string,
  orderValue: string
): Promise<{
  data: any;
  errorMessage: string | null;
}> => {
  const queryString: string = `?site=stackoverflow&pagesize=${rowsPerPage}&page=${page}&filter=!nNPvSNVZBz&sort=${sortValue}&order=${orderValue}&key=EHkhYA)xosdIqOzG9bwjsw((`;
  try {
    const response = await fetch(`${apiUrl}/tags${queryString}`);
    if (!response.ok) {
      if (response.status >= 400 && response.status < 500) {
        return {
          data: {
            items: [],
            total: 0
          },
          errorMessage: `Sorry, we couldn't find tags. ${response.statusText}`
        }
      } else if (response.status >= 500) {
        return {
          data: {
            items: [],
            total: 0
          },
          errorMessage: `Sorry, there's a problem with our server. Please try again later. ${response.statusText}`
        }
      }
      return {
        data: {
          items: [],
          total: 0
        },
        errorMessage: null
      };
    }
    const data = await response.json();
    if(data.items && data.items.length > 0) {
      return {
        data,
        errorMessage: null
      };
    } else {
      return {
        data: {
          items: [],
          total: 0
        },
        errorMessage: "No tags found."
      };
    }
  } catch (error) {
    return {
      data: {
        items: [],
        total: 0
      },
      errorMessage: "An unexpected error occurred. Please try again."
    };
  }
}

export default fetchTags;