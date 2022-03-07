export default async function ({ redirect, app }) {
  try {
    const result = await app.$api.user.getCurrentUser();
    if (result.isAdmin !== true) redirect('/login');
  } catch (error) {
    redirect('/login');
  }
}
