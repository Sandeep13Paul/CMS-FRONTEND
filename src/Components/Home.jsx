import useUsers from '../Hooks/useUsers';
import Layout from './Layout.jsx';

const Home = () => {
  const { loading, error } = useUsers();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading users!</div>;

  return (
    <Layout>
      <section className="flex justify-center items-center">
        <div className="mt-40 text-center">
            <h1 className="font-bold text-4xl mb-3">Contact Manager</h1>
            <p className='text-2xl mb-8'>
                Start Adding your Contact in an easy and simple way.
            </p>
            <a href='/login' className="bg-primary p-4 px-8 rounded-full text-white">Get Started</a>
        </div>
    </section>
    </Layout>
  );
};

export default Home;
