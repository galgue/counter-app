import { trpc } from "../utils/trpc";

export const useCounters = () => {
	const { data: counters, refetch: refatchCouters } = trpc.useQuery(["counter.getAll"], {
		ssr: true
	});
	const { mutate: addCounter } = trpc.useMutation(["counter.add"], {
		onSuccess: () => refatchCouters()
	});

	const { mutate: increment } = trpc.useMutation(["counter.increment"], {
		onSuccess: () => refatchCouters()
	});

	const { mutate: decrement } = trpc.useMutation(["counter.decrement"], {
		onSuccess: () => refatchCouters()
	});

	const { mutate: deleteCounter } = trpc.useMutation(["counter.delete"], {
		onSuccess: () => refatchCouters()
	});

	return {
		counters: counters?.map(({ counter, id }) => ({
			counter,
			id,
			increment() {
				increment({id});
			},
			decrement() {
				decrement({id});
			},
			deleteCounter() {
				deleteCounter({id});
			}
		})),
		addCounter
	}
}