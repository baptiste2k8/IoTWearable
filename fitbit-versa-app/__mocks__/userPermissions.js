import { me } from 'appbit';

export function canAccessHeartRate() {
  return me.permissions.granted("access_heart_rate");
}

export function canAccessUserProfile() {
  return me.permissions.granted("access_user_profile");
}

export function canAccessLocation() {
  return me.permissions.granted("access_location");
}