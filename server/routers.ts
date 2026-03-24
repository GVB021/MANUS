import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import * as db from "./db";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Modules
  modules: router({
    list: publicProcedure.query(async () => {
      return await db.getModules();
    }),
    getBySlug: publicProcedure.input((input: any) => input).query(async ({ input }) => {
      return await db.getModuleBySlug(input.slug);
    }),
  }),

  // Banners
  banners: router({
    list: publicProcedure.query(async () => {
      return await db.getBanners();
    }),
  }),

  // Students
  students: router({
    me: protectedProcedure.query(async ({ ctx }) => {
      return await db.getStudentByUserId(ctx.user.id);
    }),
  }),

  // Takes
  takes: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      const student = await db.getStudentByUserId(ctx.user.id);
      if (!student) return [];
      return await db.getTakesByStudentId(student.id);
    }),
  }),

  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;
