import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Profile extends Component {
state = {
  userProfile: {},
  loading: false,
}

componentDidMount = async () => {
  this.setState({
    loading: true,
  });
  const user = await getUser();
  this.setState({
    userProfile: user,
    loading: false,
  });
  console.log(user);
}

render() {
  const { loading, userProfile } = this.state;
  return (
    <section>
      <div>
        <Header />
      </div>
      <div data-testid="page-profile">
        {loading ? <Loading /> : (
          <>
            <>
              <p>{userProfile.name}</p>
              <p>{userProfile.email}</p>
              <img
                data-testid="profile-image"
                src={ userProfile.image }
                alt="profileImage"
              />
              <p>{userProfile.description}</p>
            </>
            <Link to="/profile/edit">Editar perfil</Link>

          </>
        )}
      </div>
    </section>
  );
}
}
