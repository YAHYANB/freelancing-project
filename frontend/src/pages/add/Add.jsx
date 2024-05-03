import { useEffect, useState } from "react";
import "./Add.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddGig, fetchShowGig, fetchUpdateGig } from "../../redux/Gigs";
import { ImSpinner2 } from 'react-icons/im'
import { useNavigate, useParams } from "react-router-dom";

const Add = () => {
  const dispatch = useDispatch()
  const token = JSON.parse(localStorage.getItem('token'))
  const user = useSelector((i) => i.user);
  const status = useSelector((i) => i.gigs.status);
  const errors = useSelector((i) => i.gigs.gigs);
  const location = useNavigate()

  const [gig, setGig] = useState({
    title: '',
    category: '',
    coverImage: null,
    images: [],
    description: '',
    serviceTitle: '',
    shortDescription: '',
    deliveryTime: '',
    revisionNumber: '',
    price: '',
    features: []
  })


  const handleInputs = (e) => {
    const { name, value } = e.target;
    if (name === 'coverImage') {
      setGig({
        ...gig,
        coverImage: e.target.files[0]
      });
    } else if (name === 'features') {
      setGig({
        ...gig,
        features: [...gig.features, value]
      });
    } else {
      setGig({
        ...gig,
        [name]: value
      });
    }
  };

  useEffect(() => {
    console.log(status)
  }, [status])
  const handleFeatureInput = (index, value) => {
    const newFeatures = [...gig.features];
    newFeatures[index] = value;
    setGig({ ...gig, features: newFeatures });
  };

  const handlePictureUpload = (e) => {
    const files = e.target.files;
    const picturesArray = [];

    for (let i = 0; i < files.length; i++) {
      picturesArray.push(files[i]);
    }

    setGig(prevState => ({
      ...prevState,
      images: [...gig.images, ...picturesArray],
    }));
  };

  const handleForm = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('user_id', user.user.id)
    formData.append('title', gig.title)
    formData.append('category', gig.category)
    formData.append('coverImage', gig.coverImage)
    formData.append('description', gig.description)
    formData.append('serviceTitle', gig.serviceTitle)
    formData.append('shortDescription', gig.shortDescription)
    formData.append('deliveryTime', gig.deliveryTime)
    formData.append('revisionNumber', gig.revisionNumber)
    formData.append('price', gig.price)

    gig.images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });
    gig.features.forEach((feature, index) => {
      formData.append(`features[${index}]`, feature);
    });

    const data = {
      token, formData
    }

    const response = await dispatch(fetchAddGig(data))
    if (response?.payload.status === 201) {
      window.location.href = '/gigs'
    }

  }
  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <form className="sections" onSubmit={handleForm}>
          <div className="info">
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. I will do something I'm really good at"
              value={gig.title} onChange={handleInputs}
              required
            />
            {errors?.error?.title && <span className="text-sm text-red-600">{errors.error.title}</span>}

            <label htmlFor="">Category</label>
            <select name="category" value={gig.category} onChange={handleInputs} id="cats" required>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>
            {errors?.error?.category && <span className="text-sm text-red-600">{errors.error.category}</span>}

            <label htmlFor="">Cover Image</label>
            <input type="file" name="coverImage" onChange={handleInputs} required />
            {errors?.error?.coverImage && <span className="text-sm text-red-600">{errors.error.coverImage}</span>}

            <label htmlFor="">Upload Images</label>
            <input type="file" name="images" onChange={handlePictureUpload} multiple />
            {errors?.error?.images && <span className="text-sm text-red-600">{errors.error.images}</span>}

            <label htmlFor="">Description</label>
            <textarea name="description" value={gig.description} onChange={handleInputs} required id="" placeholder="Brief descriptions to introduce your service to customers" cols="0" rows="16"></textarea>
            {errors?.error?.description && <span className="text-sm text-red-600">{errors.error.description}</span>}

            {status && status === 'loading'

              ? <button type="button"><ImSpinner2 className='ImSpinner2' /></button>
              : <button type="submit">Create</button>

            }
          </div>
          <div className="details">
            <label htmlFor="">Service Title</label>
            <input type="text" name="serviceTitle" value={gig.serviceTitle} onChange={handleInputs} required placeholder="e.g. One-page web design" />
            {errors?.error?.serviceTitle && <span className="text-sm text-red-600">{errors.error.serviceTitle}</span>}

            <label htmlFor="">Short Description</label>
            <textarea name="shortDescription" value={gig.shortDescription} onChange={handleInputs} required id="" placeholder="Short description of your service" cols="30" rows="10"></textarea>
            {errors?.error?.shortDescription && <span className="text-sm text-red-600">{errors.error.shortDescription}</span>}

            <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input type="number" name="deliveryTime" value={gig.deliveryTime} onChange={handleInputs} required />
            {errors?.error?.deliveryTime && <span className="text-sm text-red-600">{errors.error.deliveryTime}</span>}

            <label htmlFor="">Revision Number</label>
            <input type="number" name="revisionNumber" value={gig.revisionNumber} onChange={handleInputs} required />
            {errors?.error?.revisionNumber && <span className="text-sm text-red-600">{errors.error.revisionNumber}</span>}

            <label htmlFor="">Add Features</label>
            {

              [1, 2, 3, 4].map((_, i) => (
                <>
                  <input
                    type="text"
                    key={i}
                    value={gig.features[i] || ''}
                    onChange={e => handleFeatureInput(i, e.target.value)}
                    placeholder="e.g. page design"
                    required
                  />
                </>
              ))

            }
            {errors?.error?.features && <span className="text-sm text-red-600">{errors.error.features}</span>}

            <label htmlFor="">Price</label>
            <input type="number" name="price" value={gig.price} onChange={handleInputs} required />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
