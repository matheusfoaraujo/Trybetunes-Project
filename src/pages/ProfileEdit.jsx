import React, { Component } from 'react';
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
  }

  componentDidMount = async () => {
    this.setState({
      loading: true,
    });
    const user = await getUser();
    const { name, email, image, description } = user;
    console.log(name);
    this.setState({
      userName: name,
      userEmail: email,
      userImage: image,
      userDescription: description,
      loading: false,
    });
    console.log(user);
  }

       onInputChange = ({ target }) => { // desconstroi o evento pegando o target, o node que está sendo modificado
         const { value, name } = target;
         console.log(target);
         console.log(value, name);// desconstroi o valor de dentro do target que está sendo modificado
         this.setState({ [name]: value }, () => {
           // callback que pega os valores do estado já atualizados pelo onChange
           const { userName, userEmail, userImage, userDescription } = this.state;
           const minChar = 1;
           if (userEmail.includes('@test.com')) {
             this.setState({ isSaveButtonDisabled: false });
           } else {
             this.setState({ isSaveButtonDisabled: true });
           }
           if (userName.length > minChar
        || userEmail.length > minChar
        || userImage.length > minChar
        || userDescription.length > minChar
           ) {
             this.setState({ isSaveButtonDisabled: false });
           } else {
             this.setState({ isSaveButtonDisabled: true });
           }
         });
       }

  onSaveButtonClick = async (event) => {
    const { userName, userEmail, userImage, userDescription } = this.state;
    event.preventDefault();
    // const { userName, userEmail, userImage, userDescription } = this.state;

    const updatedUser = {
      newUserName: userName,
      newUserEmail: userEmail,
      newUserImage: userImage,
      newUserDescription: userDescription,
    };
    await updateUser(updatedUser);
  }

  render() {
    const {
      loading,
      isSaveButtonDisabled,
      userName,
      userEmail,
      userImage,
      userDescription } = this.state;

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
