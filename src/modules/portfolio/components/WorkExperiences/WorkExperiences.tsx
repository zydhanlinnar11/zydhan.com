import ListItem from '../elements/ListItem'

const experiences = [
  {
    name: 'Full-stack Developer Intern @DPTSI ITS',
    description:
      'I was offered and accepted an internship offer with DPTSI - Directorate that manages Information Technology services in Sepuluh Nopember Institute of Technology Surabaya.',
    date: 'Aug 2021 - now',
    url: 'https://its.ac.id/dptsi',
  },
]

const WorkExperiences = () => {
  return (
    <ol className="py-4">
      {experiences.map(({ description, name, date, url }) => (
        <ListItem
          date={date}
          title={name}
          description={description}
          url={url}
          key={name}
          target="_blank"
        />
      ))}
    </ol>
  )
}

export default WorkExperiences
