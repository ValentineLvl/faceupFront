export default function(photoList = [], action) {
    if(action.type == 'savePhoto') {
        var photoListCopy = [...photoList, action.photo];
        return photoListCopy;
    } else {
        return photoList;
    }
}