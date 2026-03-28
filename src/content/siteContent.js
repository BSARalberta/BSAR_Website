export const navigation = [
  { label: 'Home', to: '/' },
  { label: 'Donate', to: '/donate' },
  { label: 'Join', to: '/join' },
  { label: 'Public Events & Info', to: '/public-events-info' },
]

export const footerContent = {
  organization: 'Badlands Search and Rescue',
  description: 'Volunteer search and rescue service supporting the badlands region.',
  contactEmails: [
    'info@badlandsearchandrescue.com',
    'president@badlandsearchandrescue.com',
    'secretary@badlandsearchandrescue.com',
    'treasurer@badlandsearchandrescue.com',
    'vicepresident@badlandsearchandrescue.com',
  ],
  facebook: {
    label: 'Facebook',
    href: 'https://www.facebook.com/badlandsar/',
  },
}

export const homeContent = {
  hero: {
    eyebrow: 'Badlands Search and Rescue',
    title: 'Prepared volunteers supporting the badlands region.',
    description:
      'Badlands Search and Rescue is a community-focused volunteer organization dedicated to readiness, teamwork, and professional support when people need help the most.',
    image: {
      src: '/images/biker_injury.jpg',
      alt: 'Placeholder hero banner for Badlands Search and Rescue',
      label: 'Hero banner placeholder',
    },
  },
  community: {
    title: 'Helping keep the community safe',
    paragraphs: [
      'Search and rescue organizations play a critical role in emergency response, public safety, and community readiness. Their work often involves locating missing or lost persons, providing first aid in remote or high-risk environments, and ensuring individuals are safely returned home. These efforts depend on disciplined training, dependable equipment, and volunteers who can operate calmly and effectively under pressure.',
      'Badlands Search and Rescue is a trusted local resource dedicated to serving the community through rapid response, coordinated search efforts, and on-the-ground support during emergencies. Their team is committed to preparation, teamwork, and delivering reliable assistance when it matters most.',
    ],
  },
  values: [
    {
      title: 'Integrity and responsibility',
      description:
        'BSAR members act with honesty, take responsibility for their actions, and make decisions they can stand behind. This builds trust with the public, partner agencies, and each other.',
    },
    {
      title: 'Teamwork',
      description:
        'BSAR works as a coordinated team, built on clear communication and mutual trust. By supporting one another, we respond effectively and deliver reliable results in the field.',
    },
    {
      title: 'Professionalism',
      description:
        'BSAR delivers professional service through skill, preparation, and clear communication. We make sound decisions in the field to support agencies and ensure those in need receive effective, reliable care.',
    },
  ],
  ctas: [
    {
      title: 'Donate',
      description:
        'Support training, equipment, operations, and ongoing readiness through financial contributions.',
      to: '/donate',
      linkLabel: 'Support the team',
    },
    {
      title: 'Join the Team',
      description:
        'Learn what service, training, and commitment look like for prospective volunteers.',
      to: '/join',
      linkLabel: 'Explore volunteer roles',
    },
  ],
}

export const donateContent = {
  hero: {
    eyebrow: 'Support the Mission',
    title: 'Donations strengthen readiness.',
    description:
      'Your support keeps our team trained, equipped, and ready to find the missing, provide aid, and bring people home safely.',
    image: {
      src: '/images/happy_members.jpg',
      alt: 'Placeholder image for the donate page',
      label: 'Donate page image placeholder',
    },
  },
  reasons: [
    'Specialty training equips volunteers with skills to make our team more versitile and better prepared for any situation.',
    'Proper equipment ensures our team has reliable tools and communication in the field.',
    'Community investments help strengthen outreach, preparedness, and long-term sustainability.',
  ],
  cta: {
    title: 'Discuss a donation, sponsorship, or in-kind contribution',
    description:
      'Use this form to contact Badlands Search and Rescue about financial donations, corporate sponsorships, equipment support, or fundraising partnerships.',
    highlights: [
      'Tell us how you would like to support BSAR and any relevant details about your contribution or idea.',
      'Include event timelines, sponsorship questions, or notes about equipment or services you would like to provide.',
      'A team member will review your inquiry and follow up by email as soon as possible.',
    ],
  },
}

export const joinContent = {
  hero: {
    eyebrow: 'Volunteer With Purpose',
    title: 'Service, Preparation, Commitment.',
    description:
      'Badlands Search and Rescue is intended for people who want to contribute meaningfully, train consistently, and support others through organized volunteer service.',
    image: {
      src: '/images/shake_hands.jpg',
      alt: 'Placeholder image for the join page',
      label: 'Join page image placeholder',
    },
  },
}

export const transparencyBanner = {
  eyebrow: 'Public Events and Information',
  title: 'Find upcoming events, AGMs, and public information',
  description:
    'Find ways to connect with our team, attend public events, and stay informed on important updates.',
  image: {
    src: '/images/BSAR_logo.jpg',
    alt: 'Placeholder banner for the transparency page',
    label: 'Transparency banner placeholder',
    squareContain: true,
  },
}
