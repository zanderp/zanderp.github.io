import { useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';
import { DataService } from '../data/dataService';

export const SkillPills = ({ setHoveredSkill }) => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const topSkills = await DataService.getTopSkills();
        setSkills(topSkills);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };
    fetchSkills();
  }, []);

  return (
    <div className="d-flex flex-wrap justify-content-center gap-2 mt-4">
      {skills.map((skill, index) => (
        <Badge
          key={index}
          pill
          bg="secondary"
          className="skill-pill px-3 py-2"
          onMouseEnter={() => setHoveredSkill(skill)}
          onMouseLeave={() => setHoveredSkill(null)}
        >
          {skill.name}
        </Badge>
      ))}
    </div>
  );
};
