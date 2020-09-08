import { Admin } from '@espressive/cascara';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

const Main = ({ children, ...rest }) => {
  const { query } = useRouter();

  return (
    <AnimatePresence exitBeforeEnter>
      <Admin.Main {...rest}>
        <motion.div
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          key={query.slug}
          style={{ padding: '1em' }}
        >
          {children}
        </motion.div>
      </Admin.Main>
    </AnimatePresence>
  );
};

export default Main;
