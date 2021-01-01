import firebase from "../firebase-config";

export const db = firebase.firestore();
export const storage = firebase.storage();
export const auth = firebase.auth();
export const user = auth.currentUser;

export const getTimestamp = (date) => {
  if (date) return firebase.firestore.Timestamp.fromDate(date);
  else return firebase.firestore.Timestamp.fromDate(new Date());
};

export const getIncrement = (number) => {
  return firebase.firestore.FieldValue.increment(number);
};

export const firebaseObject = () => {
  return firebase;
};

export const getGeoLatitude = (latitude, longitude) => {
  return new firebase.firestore.GeoPoint(latitude, longitude);
};

export const fetchUser = async () => {
  const user = auth.currentUser;
  try {
    if (user !== null) {
      const res = await db.collection("users").doc(user.uid).get();
      return { err: null, user: res.data() };
    } else {
      return { err: { message: "Error" } };
    }
  } catch (e) {
    return { err: e, user: null };
  }
};
export const userLogin = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    return await fetchUser();
  } catch (e) {
    return { err: e, user: null };
  }
};

export const userLogout = async () => {
  await auth.signOut();
};

export const createUser = async (user) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(
      user.email,
      user.password
    );
    const userModel = {
      email: user.email,
      fullname: user.fullname,
      country: user.country,
      isMerchant: false,
      user_id: res.user.uid,
      wallet_balance: 0.0,
      cart: [],
      shipping_address: {},
    };
    await db.collection("users").doc(res.user.uid).set(userModel);
    return { user: userModel };
  } catch (e) {
    // await auth.currentUser.delete();
    return { err: e, user: null };
  }
};

export const passwordReset = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    return {};
  } catch (e) {
    return { err: e };
  }
};

export const uploadOneFile = async (file, folderPath, name) => {
  try {
    let fileType = file.name.split(".");
    let filename = folderPath + name || "" + "." + fileType[1];
    filename = filename.replace(/\s/g, "").trim();

    let fileRef = storage.ref().child(filename);
    await fileRef.put(file);
    let url = await fileRef.getDownloadURL();
    return { err: null, url };
  } catch (e) {
    console.log(e);
    return { err: e };
  }
};

export const getResizedImageUrl = async (file, folderPath, name, locId) => {
  try {
    let fileType = file.name.split(".");
    let filename = folderPath + name + "." + fileType[1];
    filename = filename.replace(/\s/g, "").trim();
    let filenameArray = filename.split(".");

    if (Array.isArray(fileType)) {
      setTimeout(async () => {
        filename = filenameArray[0] + "_350x250"; //+ '.' + filenameArray[1];
        let fileRef = storage.ref().child(filename.trim());
        let url = await fileRef.getDownloadURL();

        await db
          .collection("locations")
          .doc(locId)
          .update({
            resizedImages: firebase.firestore.FieldValue.arrayUnion(url),
          });
        return { err: null, url };
      }, 6500);
    }
    return { err: "Cannot get filename array" };
  } catch (e) {
    console.log(e);
    return { err: e };
  }
};

export const deleteFile = async (filePath) => {
  try {
    let fileRef = storage.ref().child(filePath);
    await fileRef.delete();
    return { err: null };
  } catch (e) {
    console.log(e);
    return { err: e };
  }
};
