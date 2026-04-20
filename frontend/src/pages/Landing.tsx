import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { buttonClassName } from '@/utils/buttonStyles'
import { ROUTES } from '@/utils/constants'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export function Landing(): React.ReactElement {
  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_55%_at_50%_-8%,oklch(0.62_0.1_245/0.2),transparent)] dark:bg-[radial-gradient(ellipse_70%_50%_at_50%_-5%,oklch(0.72_0.09_245/0.07),transparent)]"
        aria-hidden
      />
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-16 sm:px-6 sm:py-24 lg:flex-row lg:items-center lg:gap-12 lg:py-28">
        <div className="flex-1 text-center lg:text-left">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-sm font-semibold uppercase tracking-widest text-primary"
          >
            Real-time messaging
          </motion.p>
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-4 text-4xl font-semibold tracking-tight text-text sm:text-5xl lg:text-6xl"
          >
            Connect instantly with anyone
          </motion.h1>
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mx-auto mt-5 max-w-xl text-lg text-text-muted lg:mx-0"
          >
            Pulse keeps your conversations in sync with a fast, focused chat experience.
            Jump in, message clearly, and stay in flow — built for teams and friends who
            value clarity over clutter.
          </motion.p>
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
          >
            <Link
              to={ROUTES.CHAT}
              className={buttonClassName({
                variant: 'primary',
                size: 'lg',
                className:
                  'w-full min-w-[11rem] sm:w-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
              })}
            >
              Start chatting
            </Link>
            <Link
              to={ROUTES.LOGIN}
              className={buttonClassName({
                variant: 'outline',
                size: 'lg',
                className:
                  'w-full min-w-[11rem] sm:w-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
              })}
            >
              Login
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="relative flex flex-1 justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative w-full max-w-md rounded-3xl border border-border bg-surface-elevated p-4 shadow-soft">
            <div className="mb-3 flex items-center gap-2 border-b border-border pb-3">
              <span className="size-2.5 rounded-full bg-emerald-500" aria-hidden />
              <span className="text-xs font-medium text-text-muted">Live preview</span>
            </div>
            <div className="space-y-3">
              <ChatPreviewRow align="left" name="Alex" text="On my way — 2 min!" />
              <ChatPreviewRow align="right" name="You" text="Perfect, grabbing coffee." />
              <ChatPreviewRow
                align="left"
                name="Alex"
                text="☕ Want anything from the shop?"
              />
            </div>
            <motion.div
              className="pointer-events-none absolute -right-6 -bottom-6 hidden h-24 w-24 rounded-3xl bg-primary/20 blur-2xl sm:block"
              animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function ChatPreviewRow({
  align,
  name,
  text,
}: {
  align: 'left' | 'right'
  name: string
  text: string
}): React.ReactElement {
  const isRight = align === 'right'
  return (
    <div className={`flex ${isRight ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow-card ${
          isRight
            ? 'rounded-br-md bg-primary text-primary-foreground'
            : 'rounded-bl-md bg-surface-muted text-text'
        }`}
      >
        <p className="text-[10px] font-medium opacity-80">{name}</p>
        <p className="mt-0.5 leading-snug">{text}</p>
      </div>
    </div>
  )
}
