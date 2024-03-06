export default function CategoryRedirect() {
  return null;
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  return {
    redirect: {
      destination: `/collections/${slug}`,
      permanent: true,
    },
  };
}
