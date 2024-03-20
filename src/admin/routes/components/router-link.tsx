// import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

// ----------------------------------------------------------------------

interface RouterLinkProps {
  to: string;
  [key: string]: any; // for additional props
}

const RouterLink = forwardRef<HTMLAnchorElement, RouterLinkProps>(({ to, ...other }, ref) => (
  <Link ref={ref} to={to} {...other} />
));

export default RouterLink;
