import db from '../../db/index.js'
import { serializeAll } from '../../utils/serialize.js'
import {
  MenuItem,
  Drink,
  GalleryImage,
  BlogPost,
  Reservation,
  Testimonial,
  ContactMessage,
  NewsletterSubscriber,
} from '../../models/index.js'

const count = async (table, queryFn = (qb) => qb) => {
  const row = await queryFn(db(table)).count({ total: '*' }).first()
  return Number(row?.total ?? 0)
}

const countBy = (table, column, value) =>
  count(table, (query) => query.where(column, value))

export const stats = async (_req, res) => {
  const [menuItems, drinks, gallery, blogPosts, subscribers] = await Promise.all([
    count(MenuItem.table),
    count(Drink.table),
    count(GalleryImage.table),
    count(BlogPost.table),
    countBy(NewsletterSubscriber.table, 'active', true),
  ])

  const [resTotal, resPending, resConfirmed, resCancelled] = await Promise.all([
    count(Reservation.table),
    countBy(Reservation.table, 'status', 'pending'),
    countBy(Reservation.table, 'status', 'confirmed'),
    countBy(Reservation.table, 'status', 'cancelled'),
  ])

  const [tTotal, tPending, tApproved] = await Promise.all([
    count(Testimonial.table),
    countBy(Testimonial.table, 'approved', false),
    countBy(Testimonial.table, 'approved', true),
  ])

  const [msgTotal, msgUnread] = await Promise.all([
    count(ContactMessage.table),
    countBy(ContactMessage.table, 'read', false),
  ])

  res.json({
    menu_items: menuItems,
    drinks,
    gallery,
    blog_posts: blogPosts,
    reservations: {
      total: resTotal,
      pending: resPending,
      confirmed: resConfirmed,
      cancelled: resCancelled,
    },
    testimonials: {
      total: tTotal,
      pending: tPending,
      approved: tApproved,
    },
    messages: {
      total: msgTotal,
      unread: msgUnread,
    },
    subscribers,
  })
}

export const recentReservations = async (_req, res) => {
  const rows = await db(Reservation.table).orderBy('id', 'desc').limit(10)
  res.json({ data: serializeAll(rows) })
}

export const recentMessages = async (_req, res) => {
  const rows = await db(ContactMessage.table)
    .where('read', false)
    .orderBy('id', 'desc')
    .limit(10)
  res.json({ data: serializeAll(rows) })
}