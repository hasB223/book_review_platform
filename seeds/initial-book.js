/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  return knex.raw(
    `
  insert into book (id, BookName, Description, BookImage, BookAuthor)
  values 
  (1, "Can't Hurt Me", 
"For David Goggins, childhood was a nightmare -- poverty, prejudice, and physical abuse colored his days and haunted his nights. But through self-discipline, mental toughness, and hard work, Goggins transformed himself from a depressed, overweight young man with no future into a U.S. Armed Forces icon and one of the world's top endurance athletes. The only man in history to complete elite training as a Navy SEAL, Army Ranger, and Air Force Tactical Air Controller, he went on to set records in numerous endurance events, inspiring Outside magazine to name him 'The Fittest (Real) Man in America.'

In Can't Hurt Me, he shares his astonishing life story and reveals that most of us tap into only 40% of our capabilities. Goggins calls this The 40% Rule, and his story illuminates a path that anyone can follow to push past pain, demolish fear, and reach their full potential.",
 'https://m.media-amazon.com/images/I/61pDNU9qEGL.jpg', 
 'David Goggins'),
 
 (2, 'Atomic Habits',"No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results. 

Atomic Habits will reshape the way you think about progress and success, and give you the tools and strategies you need to transform your habits--whether you are a team looking to win a championship, an organization hoping to redefine an industry, or simply an individual who wishes to quit smoking, lose weight, reduce stress, or achieve any other goal.",
'https://m.media-amazon.com/images/I/81bGKUa1e0L.jpg',
'James Clear'),

(3, 'Ikigai', 
"According to the Japanese, everyone has an ikigai—a reason for living. And according to the residents of the Japanese village with the world’s longest-living people, finding it is the key to a happier and longer life. Having a strong sense of ikigai—where what you love, what you’re good at, what you can get paid for, and what the world needs all overlap—means that each day is infused with meaning. It’s the reason we get up in the morning. It’s also the reason many Japanese never really retire (in fact there’s no word in Japanese that means retire in the sense it does in English): They remain active and work at what they enjoy, because they’ve found a real purpose in life—the happiness of always being busy.", 
'https://m.media-amazon.com/images/I/71B-7twlcFL.jpg', 
'Héctor García & Francesc Miralles'),

(4, 'I Love You to the Moon and Back', 
"The sun rises, and a bear and cub begin their day together. They splash in the water, climb mountains, watch the colorful lights in the shimmering sky, and play with friends. They show their love for each other by touching noses, chasing each other, and, of course, hugging and snuggling before bed. A sweet, gentle rhyme, perfect for sharing with a special little one that also includes a 'To' and 'From' personalization page in the front of the book, making this heartwarming book an ideal gift.", 
'https://m.media-amazon.com/images/I/8144Vic9C5L.jpg', 
'Amelia Hepworth'),

(5, 'A Brief History of Time', 
"A landmark volume in science writing by one of the great minds of our time, Stephen Hawking’s book explores such profound questions as: How did the universe begin—and what made its start possible? Does time always flow forward? Is the universe unending—or are there boundaries? Are there other dimensions in space? What will happen when it all ends?

Told in language we all can understand, A Brief History of Time plunges into the exotic realms of black holes and quarks, of antimatter and 'arrows of time,' of the big bang and a bigger God—where the possibilities are wondrous and unexpected. With exciting images and profound imagination, Stephen Hawking brings us closer to the ultimate secrets at the very heart of creation.", 
'https://m.media-amazon.com/images/I/71im6JWXVuL.jpg', 
'Stephen Hawking'),

(6, 'Diary of a Wimpy Kid', 
"This is a story about Greg Hefley's summer vacation of first middle school year trying to staying out of trouble and keeping his older brother, Rodrick, from exposing his worst humiliating secrets.", 
'https://m.media-amazon.com/images/I/81vBOLkdh-L.jpg', 
'Jeff Kinney ');
  `
  );
};
