export const navigation = [
  { label: 'Home', to: '/' },
  { label: 'Donate', to: '/donate' },
  { label: 'Join', to: '/join' },
  { label: 'Transparency', to: '/transparency' },
]

export const footerContent = {
  organization: 'Badlands Search and Rescue',
  contactLabel: 'Placeholder contact info',
  contactValue: 'info@your-organization.ca',
  socialLabel: 'Placeholder social links',
  socialValue: '@badlandssearchandrescue',
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
    title: 'Donations help strengthen readiness before help is needed.',
    description:
      'Community support helps a volunteer organization sustain training, maintain equipment, improve operational readiness, and continue serving responsibly.',
    image: {
      src: '/images/donate-placeholder.svg',
      alt: 'Placeholder image for the donate page',
      label: 'Donate page image placeholder',
    },
  },
  reasons: [
    'Training helps volunteers build the judgment, coordination, and confidence required in demanding situations.',
    'Equipment support helps keep response tools, communications, and field readiness up to standard.',
    'Operational funding helps the team stay organized, prepared, and able to support the community when called upon.',
    'Community readiness investments help strengthen outreach, preparedness, and long-term sustainability.',
  ],
  cta: {
    title: 'Future donation link or platform goes here',
    description:
      'Replace this placeholder with a secure donation button, fundraising link, or embedded giving platform when ready.',
    buttonLabel: 'Donation platform placeholder',
  },
}

export const joinContent = {
  hero: {
    eyebrow: 'Volunteer With Purpose',
    title: 'Joining means service, preparation, and a commitment to working as a team.',
    description:
      'Badlands Search and Rescue is intended for people who want to contribute meaningfully, train consistently, and support others through organized volunteer service.',
    image: {
      src: '/images/join-placeholder.svg',
      alt: 'Placeholder image for the join page',
      label: 'Join page image placeholder',
    },
  },
  expectations: [
    'Service involves showing up reliably, learning the team’s standards, and contributing to a professional culture.',
    'Training is a core part of participation and helps volunteers develop practical skills, confidence, and readiness.',
    'Teamwork matters because search and rescue depends on trust, communication, and the ability to work effectively with others.',
    'Commitment matters because volunteer response organizations rely on consistent participation to stay capable over time.',
  ],
  goodFit: [
    'People who value service and want to contribute to community safety in a practical way.',
    'People who are willing to train, learn procedures, and approach responsibility with maturity.',
    'People who work well in teams and understand the importance of accountability and clear communication.',
    'People who are looking for meaningful volunteer involvement rather than casual participation.',
  ],
  cta: {
    title: 'Future application form or contact method goes here',
    description:
      'Replace this area with an application form, email contact, volunteer intake process, or external sign-up link.',
    buttonLabel: 'Volunteer application placeholder',
  },
}

export const transparencyBanner = {
  eyebrow: 'Public Information',
  title: 'A clear, update-friendly place for notices, documents, and organizational transparency.',
  description:
    'This page is designed so announcements and public records can be added quickly without restructuring the site.',
  image: {
    src: '/images/transparency-placeholder.svg',
    alt: 'Placeholder banner for the transparency page',
    label: 'Transparency banner placeholder',
  },
}

export const transparencySections = [
  {
    title: 'AGM announcements',
    description:
      'Use this section for annual general meeting notices, meeting dates, agendas, and related updates.',
    items: [
      {
        title: 'AGM notice placeholder',
        description:
          'Add the date, time, attendance details, and any participation instructions here.',
        meta: 'Update this entry with real AGM details',
        href: '#',
        linkLabel: 'Future AGM document',
      },
      {
        title: 'AGM agenda placeholder',
        description:
          'Use this entry for an agenda PDF or web page once it is ready for publication.',
        meta: 'PDF placeholder',
        href: '#',
        linkLabel: 'Agenda placeholder',
      },
    ],
  },
  {
    title: 'Public notices',
    description:
      'Post general public-facing notices, organizational updates, and important announcements here.',
    items: [
      {
        title: 'Public notice example',
        description:
          'This card can be used for temporary updates, calls for attention, or general notices to the public.',
        meta: 'Web update placeholder',
        href: '#',
        linkLabel: 'Notice placeholder',
      },
    ],
  },
  {
    title: 'Important documents',
    description:
      'Keep key bylaws, policies, governance documents, or reference materials in one place.',
    items: [
      {
        title: 'Bylaws placeholder',
        description:
          'Replace this with a direct PDF or document link when the file is available.',
        meta: 'PDF placeholder',
        href: '#',
        linkLabel: 'Download placeholder PDF',
      },
      {
        title: 'Policy document placeholder',
        description:
          'Use this for public-facing policies or governance information you want to share openly.',
        meta: 'Document placeholder',
        href: '#',
        linkLabel: 'Open placeholder document',
      },
    ],
  },
  {
    title: 'Reports and public information',
    description:
      'Use this section for annual reports, summaries, community updates, or other informational resources.',
    items: [
      {
        title: 'Annual report placeholder',
        description:
          'Replace this with a report PDF or summary page when formal reporting content is ready.',
        meta: 'Report placeholder',
        href: '#',
        linkLabel: 'View report placeholder',
      },
      {
        title: 'Community information placeholder',
        description:
          'This card can also be used for educational resources or public-facing readiness information.',
        meta: 'Resource placeholder',
        href: '#',
        linkLabel: 'View resource placeholder',
      },
    ],
  },
]
