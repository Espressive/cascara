import pt from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

import { AdminStructure } from '@espressive/cascara';

const propTypes = {
  children: pt.oneOfType([pt.element, pt.arrayOf(pt.element)]),
};

const Main = ({ children, ...rest }) => {
  const { query } = useRouter();

  return (
    <AnimatePresence exitBeforeEnter>
      <AdminStructure.Main {...rest}>
        <motion.div
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          key={query.slug}
        >
          {children}
        </motion.div>
      </AdminStructure.Main>
    </AnimatePresence>
  );
};

Main.propTypes = propTypes;

export default Main;
