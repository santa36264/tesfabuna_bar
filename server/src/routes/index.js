import { Router } from 'express'
import publicRoutes from './public.routes.js'
import adminRoutes from './admin.routes.js'
import asyncHandler from '../utils/asyncHandler.js'
import db from '../db/index.js'

const router = Router()

router.get('/health', asyncHandler(async (_req, res) => {
  await db.raw('select 1')
  res.json({ status: 'ok', database: 'connected' })
}))

router.use('/admin', adminRoutes)
router.use('/', publicRoutes)

export default router