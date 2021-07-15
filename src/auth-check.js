export default function err_func(err, history) {
  console.log('err------', err);
  if (err.response && (err.response.data.message === 'Unauthorized!' || err.response.data.message === 'No token provided!')) {
    if (err.response.data.message === 'Unauthorized!') alert('Session time out');
    else alert('Please sign in first');
    localStorage.setItem('visitor_counting_app_user', JSON.stringify({}));
    history.push('/auth/login');
    return ;
  }
  else {
    alert('Error found!');
    return ;
  }
}