import useAbout from '../Hooks/useAbout';
import Layout from './Layout';

const About = () => {

  const { about, loading, error } = useAbout();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading users!</div>;

  return (  
  <Layout>
    <h1 className='mt-4'>About Us</h1>
    <p>Learn more about us on this page.</p>
    <p>{about}</p>
  </Layout>
)
};

export default About;
