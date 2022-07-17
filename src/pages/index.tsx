import type { InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { Counter } from "../components/counter";
import { useCounters } from "../hooks/useCounters";

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const Home: NextPage = ({
  
}) => {
  const { addCounter, counters } = useCounters();

  return (
    <>
      <Head>
        <title>Counter App</title>
      </Head>

      <main className="w-screen h-screen">
        <div className="flex flex-col h-5/6 w-screen place-items-center gap-3">
          {counters?.map(({ counter, id, decrement, increment, deleteCounter }) => 
            <Counter key={id} 
              count={counter} 
              onDecrement={decrement} 
              onIncrement={increment} 
              onDelete={deleteCounter} 
            />)
          }
        </div>
        <div className="flex flex-col h-1/6 w-screen place-items-center gap-3">
          <button onClick={() => addCounter(null)}>add</button>
        </div>
      </main>
    </>
  );
};

// export async function getServerSideProps() {
//     const initCounters = await global.prisma?.counters.findMany();

//     return {
//       props: {
//         initCounters
//       }
//     }
// }


export default Home;
