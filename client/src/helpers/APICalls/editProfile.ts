import { AuthApiData, AuthApiDataSuccess } from '../../interface/AuthApiData';
import { FetchOptions } from '../../interface/FetchOptions';

const editProfile = async (data: {
  name: string;
  email: string;
  gender: string;
  birthday: Date;
  telephone: string;
  address: string;
  description: string;
}): Promise<AuthApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  };
  return await fetch(`/profile/edit`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export async function editPhoto(file: File | string | null): Promise<AuthApiDataSuccess> {
  const formData = new FormData();
  if (file !== null) {
    formData.append('profilePhoto', file);
  }
  const fetchOptions: FetchOptions = {
    method: 'POST',
    body: formData,
    credentials: 'include',
  };
  return await fetch('/imageUpload/upload', fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}

export async function removePhoto(): Promise<AuthApiDataSuccess> {
  const fetchOptions: FetchOptions = {
    method: 'PUT',
    credentials: 'include',
  };
  return await fetch('/imageUpload/upload/', fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
export default editProfile;
