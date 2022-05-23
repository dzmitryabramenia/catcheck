<template>

    <div class="q-ma-md">
        <q-linear-progress v-if="progress"  query color="yellow-12" class="q-mt-sm" />
        File Library
        <q-btn :disable="disableButton" color="primary" class="q-ma-sm" @click="insertImg">Add new</q-btn>
        <q-btn v-if="file" color="green" class="q-ma-sm" @click="downImage">Download</q-btn>
        <input type="file" id="file">

    </div>

    <div class="q-pa-md flex">
        <div v-for="mode in imgSrc" :key="mode">
            <img  
                class="q-pa-xs imageSize"
                :src="`${mode}`"
            />
            
        </div>
    </div>
</template>

<script>
import { getStorage, uploadBytesResumable, ref, getDownloadURL, listAll  } from "firebase/storage"
import { event } from 'quasar'
import { uid } from 'quasar'
export default {
    data() {
        return {
            file: null,
            fitModes: [ 'cover', 'fill', 'contain', 'none', 'scale-down' ],
            imgSrc: [],
            progress: 0,
            disableButton: false
        }
    },
    methods: {

        insertImg() { // insertImg method
            this.disableButton = true
            // create an input file element to open file dialog
            const input = document.getElementById('file')
            const preview = document.createElement('div')
            
            input.insertAdjacentElement('afterend', preview)
            console.log('input', input)
            input.type = 'file'
            input.accept = '.png, .jpg .jpeg .webp'
            

           let files = []
            input.onchange = _ => {
                
                files = Array.from(input.files)
                this.file = files
                preview.innerHTML = ''

                const file = files[0]
                this.file = file

               // lets load the file as dataUrl
                const reader = new FileReader()
                
                let dataUrl = ''



                reader.onload = event => {
                    const img = new Image();

                    const fileName = 'fileName'
                    img.src = event.target.result;
                    img.onload = () => {
                    const elem = document.createElement('canvas');
                    elem.width = img.width;
                    elem.height = img.height;
                    const ctx = elem.getContext('2d');
                    // img.width и img.height будет содержать оригинальные размеры
                    ctx.drawImage(img, 0, 0);
                    ctx.canvas.toBlob((blob) => {
                        const fileImg = new File([blob], fileName, {
                        type: 'image/webp',
                        lastModified: Date.now()
                        })
                    this.file = fileImg
                    this.imageUrl = reader.result
                    }, 'image/webp', 1);
                    }
                    reader.onerror = error => console.log(error)
                }  

                reader.onloadend = function() {
                    dataUrl = reader.result
                    console.log('dataUrl', dataUrl)
                   // console.log('dataUrl', dataUrl)
                    // append result to the body of your post
                    preview.insertAdjacentHTML('afterbegin', `
                    <div class="flex flex-center preview-image" style="position: relative; margin: 8px">
                        <div 
                        data-name=${file.name}
                        style="
                            width: 100px;
                            font-size:100px;
                            height: 100px;
                            position: absolute;
                            right: 0;
                            top: 0;
                            font-weight: 100;
                            cursor: pointer;
                            color: red;
                            "
                        >
                        &times;
                        </div>
                        <img src="${dataUrl}" />
                    </div>
                    `)
                }
                reader.readAsDataURL(file)
            }
            input.click()

            const removeHandler = event => {
                if(!event.target.dataset.name) {
                    return
                }

                const {name} = event.target.dataset
                console.log('files1', files)
                files = files.filter(file => file.name !== name)

                const block = preview.querySelector(`[data-name="${name}"]`).closest('.preview-image')
                block.remove()
                this.disableButton = false
                this.file = null

            }
            preview.addEventListener('click', removeHandler)
        },
        downImage() {
            this.$q.loading.show()
            const storage = getStorage();

            // Upload file and metadata to the object 'images/mountains.jpg'
            const storageRef = ref(storage, 'imagesPost/' + 'image-' + Date.now() + '.webp');
            const uploadTask = uploadBytesResumable(storageRef, this.file);

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed',
                (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                this.progress = progress

                }, 
                (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                    case 'storage/canceled':
                    // User canceled the upload
                    break;
                    // ...
                    case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
                }
                this.$q.loading.hide()
                this.disableButton = false
                }, 
                () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    this.imgSrc.push(downloadURL)
                    this.file = null
                    this.progress = 0
                    document.querySelector('.preview-image').remove()
                    this.$q.loading.hide()
                    this.disableButton = false
                })
                }
            )
        },
        downloadImages(){

            const storage = getStorage();

            // Create a reference under which you want to list
            const listRef = ref(storage, 'imagesPost');

            // Find all the prefixes and items.
            listAll(listRef)
            .then((res) => {
                res.prefixes.forEach((folderRef) => {
                // All the prefixes under listRef.
                // You may call listAll() recursively on them.
                });
                res.items.forEach((itemRef) => {
                // All the items under listRef.
                console.log('itemRef', itemRef)
                 getDownloadURL(itemRef).then(url => this.imgSrc.push(url))

                });
            }).catch((error) => {
                // Uh-oh, an error occurred!
            });
/*                 function displayImages(row, images) {
                            itemRef.getDownloadURL().then((url) => {
                            console.log(url)
                        })
                        } */
            
        } 
    },
    computed: {
        progressLabel() {
            return (this.progress.value * 100).toFixed(2) + '%'
        }
    },
    created() {
        this.downloadImages()
    }
}
</script>

<style scoped>
 input[type="file"] {
    display: none;
}
.custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
}
.preview-image {
    position: relative;
}
.preview-remove {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 0;
    top: 0;
    font-weight: 100;
} 
.imageSize {
    max-width: 470px;
    max-height: 500px;
}

</style>