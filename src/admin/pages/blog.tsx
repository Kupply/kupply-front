import { Helmet } from 'react-helmet-async';

import { BlogView } from '../sections/blog/view';

// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <title> Blog | Minimal UI </title>

      <BlogView />
    </>
  );
}
