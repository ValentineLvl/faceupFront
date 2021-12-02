export default function(photoList = [], action) {
    if(action.type == 'savePhoto') {
        var photoListCopy = [...photoList, {url : action.photo, desc :action.desc}];
        return photoListCopy;
    } else {
        return photoList;
    }
}