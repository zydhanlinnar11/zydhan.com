import React, { Dispatch, FC, SetStateAction, Ref } from 'react'
import Input from '@/components/Form/Input'
import TextArea from '@/common/components/Form/TextArea'
import Select from '@/common/components/Form/Select'
import Post from '@/modules/blog/types/admin/Post'

type Visibility = {
  id: number
  name: string
}

type Props = {
  titleRef: Ref<HTMLInputElement>
  descriptionRef: Ref<HTMLInputElement>
  markdownRef: Ref<HTMLTextAreaElement>
  visibility: Visibility
  visibilities: Visibility[]
  setVisibility: Dispatch<SetStateAction<Visibility>>
  post?: Post
}

const PostForm: FC<Props> = ({
  descriptionRef,
  markdownRef,
  setVisibility,
  titleRef,
  visibility,
  visibilities,
  post,
}) => {
  return (
    <>
      <div>
        <label htmlFor="title" className="mb-1 block">
          Title
        </label>
        <Input
          id="title"
          placeholder="Title"
          ref={titleRef}
          defaultValue={post ? post.title : ''}
        />
      </div>
      <div>
        <label htmlFor="description" className="mb-1 block">
          Description
        </label>
        <Input
          id="description"
          placeholder="Description"
          ref={descriptionRef}
          defaultValue={post ? post.description : ''}
        />
      </div>
      <div>
        <label htmlFor="visibility" className="mb-1 block">
          Visibility
        </label>
        <Select
          items={visibilities}
          selected={visibility}
          setSelected={setVisibility}
        />
      </div>
      <div>
        <label htmlFor="markdown" className="mb-1 block">
          Markdown
        </label>
        <TextArea
          id="markdown"
          placeholder="Markdown"
          ref={markdownRef}
          className="h-96"
          defaultValue={post ? post.markdown : ''}
        />
      </div>
    </>
  )
}

export default PostForm
