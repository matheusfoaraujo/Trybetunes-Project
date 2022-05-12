import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { updateUser, getUser } from '../services/userAPI';
import ProfileCard from '../components/ProfileCard';

export default class ProfileEdit extends Component {
  state = {
    userName: '',
    userEmail: '',
    userImage: '',
    userDescription: '',
    loading: false,
    isSaveButtonDisabled: true,
    redirect: false,
  }

  componentDidMount = async () => {
    this.setState({
      loading: true,
    });
    const { name, email, image, description } = await getUser();
    console.log(name);
    this.setState({
      userName: name,
      userEmail: email,
      userImage: image,
      userDescription: description,
      loading: false,
    });
    const {
      userName,
      userEmail,
      userImage,
      userDescription } = this.state;
    const minChar = 1;
    if (userName.length > minChar
      && userEmail.length > minChar
      && userImage.length > minChar
      && userDescription.length > minChar
      && userEmail.includes('@')
    ) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  }

       onInputChange = ({ target }) => { // desconstroi o evento pegando o target, o node que está sendo modificado
         const { value, name } = target;// desconstroi o valor de dentro do target que está sendo modificado
         this.setState({ [name]: value }, () => {
           // callback que pega os valores do estado já atualizados pelo onChange
           const {
             userName,
             userEmail,
             userImage,
             userDescription } = this.state;
           const minChar = 1;
           if (userName.length > minChar
            && userEmail.length > minChar
        && userImage.length > minChar
        && userDescription.length > minChar
        && userEmail.includes('@')
           ) {
             this.setState({ isSaveButtonDisabled: false });
           } else {
             this.setState({ isSaveButtonDisabled: true });
           }
         });
       }

  onSaveButtonClick = async () => {
    const { userName, userEmail, userImage, userDescription } = this.state;
    // const { userName, userEmail, userImage, userDescription } = this.state;

    const updatedUser = {
      name: userName,
      email: userEmail,
      image: userImage,
      description: userDescription,
    };
    this.setState({
      loading: true,
    });
    await updateUser(updatedUser);
    this.setState({
      redirect: true,
      loading: false,
    });
  }

  render() {
    const {
      loading,
      isSaveButtonDisabled,
      userName,
      userEmail,
      userImage,
      userDescription, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/profile" />;
    }
    return (
      <section>
        <div>
          <Header />
        </div>
        <div data-testid="page-profile-edit">
          {loading ? <Loading /> : (
            <ProfileCard
              userName={ userName }
              userEmail={ userEmail }
              userImage={ userImage }
              userDescription={ userDescription }
              isSaveButtonDisabled={ isSaveButtonDisabled }
              onSaveButtonClick={ this.onSaveButtonClick }
              onInputChange={ this.onInputChange }
            />
          )}

        </div>
      </section>
    );
  }
}
