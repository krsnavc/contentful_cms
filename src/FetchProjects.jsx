import { createClient } from 'contentful';
import { useState } from 'react';
import { useEffect } from 'react';

const client = createClient({
  space: '9hqy7qxsk85h',
  environment: 'master',
  accessToken: import.meta.env.VITE_API_KEY,
});

export const useFetchProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getData = async () => {
    try {
      const response = await client.getEntries({ content_type: 'projects' });
      const projects = response.items.map((item) => {
        const { title, url, image } = item.fields;
        const id = item.sys.id;
        const img = image?.fields?.file?.url;
        return { title, url, img, id };
      });

      setProjects(projects);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return { projects, isLoading };
};
