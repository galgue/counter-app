import { createRouter } from "./context";
import { z } from "zod";

export const counterRouter = createRouter()
	.query('getAll', {
		resolve() {
			return global.prisma?.counters.findMany();
		}
	})
	.mutation('add', {
		input: z.number().nullable(),
		resolve({ input }) {
			return global.prisma?.counters.create({
				data: {
					counter: input || 0
				}
			})
		}
	})
	.mutation('increment', {
		input: z.object({
			id: z.string()
		}),
		resolve({input: { id }}) {
			return global.prisma?.counters.update({
				where: {
					id
				},
				data: {
					counter: {
						increment: 1
					}
				}
			});
		}
	})
	.mutation('decrement', {
		input: z.object({
			id: z.string()
		}),
		async resolve({input: { id }}) {
			const counter = await global.prisma?.counters.findUnique({
				where: {
					id
				}
			});
			if (counter && counter.counter > 0) {
				counter.counter--;
				return global.prisma?.counters.update({
					data: counter,
					where: {
						id
					}
				})
			}
		}
	})
	.mutation('delete', {
		input: z.object({
			id: z.string()
		}),
		resolve({input: { id }}) {
			return global.prisma?.counters.delete({
				where: {
					id
				}
			});
		}
	})