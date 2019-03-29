import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, CdkDragStart, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {BookDTO} from '../../../shared/dto/dto.module';
import {DialogService} from '../../../shared/services/dialog/dialog.service';
import {animate, query, sequence, stagger, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-explore-reading-plan',
  templateUrl: './explore-reading-plan.component.html',
  styleUrls: ['./explore-reading-plan.component.scss'],
  animations: [
    trigger('dropZoneIconAnimations', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-1em)'}),
        animate('0.3s ease', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateX(0)'}),
        animate('0.3s ease', style({ opacity: 0, transform: 'translateX(-1em)' })),
      ])
    ])
  ]
})
export class ExploreReadingPlanComponent implements OnInit {
  bookDTOArray: any[] = [];
  isLoading = true;
  toRead = [];
  reading = [];
  remove = [];
  done = [];

  dragging = false;
  inToReadZone = false;
  inReadingZone = false;
  inDoneZone = false;
  inRemoveZone = false;

  constructor(private dialogService: DialogService) { }

  ngOnInit() {
    this.getBooks();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  getBooks() {
    const books: BookDTO[] = JSON.parse(localStorage.getItem('books'));
    if (books !== undefined && books !== null && books.length > 0) {
      this.bookDTOArray = this.toRead = books;
      this.isLoading = false;
    } else {
      // Load default sample library.
      const sampleLibraryBooks = [{"title":"Harry Potter and the Cursed Child – Parts One and Two (Special Rehearsal Edition)","publisher":"Pottermore Publishing","publishedDate":"2016","description":"Based on an original new story by J.K. Rowling, Jack Thorne and John Tiffany, a new play by Jack Thorne, Harry Potter and the Cursed Child is the eighth story in the Harry Potter series and the first official Harry Potter story to be presented on stage. The play received its world premiere in London’s West End on 30th July 2016. It was always difficult being Harry Potter and it isn’t much easier now that he is an overworked employee of the Ministry of Magic, a husband and father of three school-age children. While Harry grapples with a past that refuses to stay where it belongs, his youngest son Albus must struggle with the weight of a family legacy he never wanted. As past and present fuse ominously, both father and son learn the uncomfortable truth: sometimes, darkness comes from unexpected places.","pageCount":320,"coverImageURL":"http://books.google.com/books/content?id=tcSMCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api","printType":"BOOK","isbn10":null,"isbn13":null,"otherIdType":null,"authors":[{"firstName":"J.K.","middleName":null,"lastName":"Rowling"},{"firstName":"John","middleName":null,"lastName":"Tiffany"},{"firstName":"Jack","middleName":null,"lastName":"Thorne"}],"categories":[{"name":"Drama"}]},{"title":"Harry Potter and the Cursed Child: The Journey","publisher":null,"publishedDate":"2019","description":"Harry Potter and the Cursed Child is one of the most celebrated stage productions of the past decade. Opening in London's West End in 2016, on Broadway in 2018 and in Melbourne in 2019 - and with more productions worldwide still to come (including San Francisco later this year) - the play has smashed records, collected countless rave reviews and awards, and captivated audiences night after night. Now readers are invited behind the scenes to experience the show's journey to the stage - from the earliest phases of development with producers Sonia Friedman and Colin Callender, to the crafting of the eighth Harry Potter story with J.K. Rowling, director John Tiffany and playwright Jack Thorne, and to the gathering of an extraordinary team of artists and actors together to bring this new part of Harry's story to life. With stunning photography, insightful interviews and never-before-seen sketches, notes, candid backstage photos and more, this full-colour deluxe edition offers readers unparalleled access to this unique production, and is a beautiful gift for Harry Potter fans and theatre-lovers alike.","pageCount":224,"coverImageURL":"http://books.google.com/books/content?id=exhlwgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api","printType":"BOOK","isbn10":null,"isbn13":null,"otherIdType":null,"authors":[{"firstName":"Harry Potter Theatrical Productions","middleName":null,"lastName":null},{"firstName":"Jody","middleName":null,"lastName":"Revenson"}],"categories":null},{"title":"The Power of Habit","publisher":"Doubleday Canada","publishedDate":"2012","description":"Groundbreaking new research shows that by grabbing hold of the three-step \"loop\" all habits form in our brains--cue, routine, reward--we can change them, giving us the power to take control over our lives. \"We are what we repeatedly do,\" said Aristotle. \"Excellence, then, is not an act, but a habit.\" On the most basic level, a habit is a simple neurological loop: there is a cue (my mouth feels gross), a routine (hello, Crest), and a reward (ahhh, minty fresh). Understanding this loop is the key to exercising regularly or becoming more productive at work or tapping into reserves of creativity. Marketers, too, are learning how to exploit these loops to boost sales; CEOs and coaches are using them to change how employees work and athletes compete. As this book shows, tweaking even one habit, as long as it's the right one, can have staggering effects. In The Power of Habit, award-winning New York Times business reporter Charles Duhigg takes readers inside labs where brain scans record habits as they flourish and die; classrooms in which students learn to boost their willpower; and boardrooms where executives dream up products that tug on our deepest habitual urges. Full of compelling narratives that will appeal to fans of Michael Lewis, Jonah Lehrer, and Chip and Dan Heath, The Power of Habit contains an exhilarating argument: our most basic actions are not the product of well-considered decision making, but of habits we often do not realize exist. By harnessing this new science, we can transform our lives.","pageCount":304,"coverImageURL":"http://books.google.com/books/content?id=xQ1_z5_kj6sC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api","printType":"BOOK","isbn10":null,"isbn13":null,"otherIdType":null,"authors":[{"firstName":"Charles","middleName":null,"lastName":"Duhigg"}],"categories":[{"name":"Social Science"}]},{"title":"Smarter Faster Better","publisher":"Random House","publishedDate":"2016","description":"NEW YORK TIMES BESTSELLER • From the author of The Power of Habit comes a fascinating book that explores the science of productivity, and why managing how you think is more important than what you think—with an appendix of real-world lessons to apply to your life. At the core of Smarter Faster Better are eight key productivity concepts—from motivation and goal setting to focus and decision making—that explain why some people and companies get so much done. Drawing on the latest findings in neuroscience, psychology, and behavioral economics—as well as the experiences of CEOs, educational reformers, four-star generals, FBI agents, airplane pilots, and Broadway songwriters—this painstakingly researched book explains that the most productive people, companies, and organizations don’t merely act differently. They view the world, and their choices, in profoundly different ways. A young woman drops out of a PhD program and starts playing poker. By training herself to envision contradictory futures, she learns to anticipate her opponents’ missteps—and becomes one of the most successful players in the world. A group of data scientists at Google embark on a four-year study of how the best teams function, and find that how a group interacts is more important than who is in the group—a principle, it turns out, that also helps explain why Saturday Night Live became a hit. A Marine Corps general, faced with low morale among recruits, reimagines boot camp—and discovers that instilling a “bias toward action” can turn even the most directionless teenagers into self-motivating achievers. The filmmakers behind Disney’s Frozen are nearly out of time and on the brink of catastrophe—until they shake up their team in just the right way, spurring a creative breakthrough that leads to one of the highest-grossing movies of all time. What do these people have in common? They know that productivity relies on making certain choices. The way we frame our daily decisions; the big ambitions we embrace and the easy goals we ignore; the cultures we establish as leaders to drive innovation; the way we interact with data: These are the things that separate the merely busy from the genuinely productive. In The Power of Habit, Pulitzer Prize–winning journalist Charles Duhigg explained why we do what we do. In Smarter Faster Better, he applies the same relentless curiosity, deep reporting, and rich storytelling to explain how we can improve at the things we do. It’s a groundbreaking exploration of the science of productivity, one that can help anyone learn to succeed with less stress and struggle, and to get more done without sacrificing what we care about most—to become smarter, faster, and better at everything we do.","pageCount":400,"coverImageURL":"http://books.google.com/books/content?id=PaLSCQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api","printType":"BOOK","isbn10":null,"isbn13":null,"otherIdType":null,"authors":[{"firstName":"Charles","middleName":null,"lastName":"Duhigg"}],"categories":[{"name":"Business & Economics"}]},{"title":"Making Habits, Breaking Habits","publisher":"Oneworld Publications","publishedDate":"2013","description":"Habits are more powerful than your will – if you know how to make them work for you Two strings are hanging from a ceiling, one at the centre of the room, one near the wall. You’re asked to tie the strings together, but you can’t reach both at the same time. You look around the room and see a table and a pair of pliers. How would you solve the problem? When confronted with challenges, most people let habits rule them (in this case, ignoring the pliers, the creative tool at your disposal). That is not surprising when you realise that at least a third of our waking hours are lived on auto-pilot – ruminating over past events, clicking through websites trawling for updates and the like. Such unconscious thoughts and actions are powerful. But the habits of the mind do not have to control us – we can steer them. Drawing on hundreds of fascinating studies, psychologist Jeremy Dean – the mind behind the hugely popular and insightful website PsyBlog – shares how the new brain science of habit can be harnessed to your benefit, whether you’re hoping to eat moreveg, take an evening run, clear out your email backlog, or be more creative when faced with challenges at work and at home.","pageCount":256,"coverImageURL":"http://books.google.com/books/content?id=7yoQVbSmS3QC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api","printType":"BOOK","isbn10":null,"isbn13":null,"otherIdType":null,"authors":[{"firstName":"Jeremy","middleName":null,"lastName":"Dean"}],"categories":[{"name":"Self-Help"}]},{"title":"You Are What You Love","publisher":"Brazos Press","publishedDate":"2016","description":"You are what you love. But you might not love what you think. In this book, award-winning author James K. A. Smith shows that who and what we worship fundamentally shape our hearts. And while we desire to shape culture, we are not often aware of how culture shapes us. We might not realize the ways our hearts are being taught to love rival gods instead of the One for whom we were made. Smith helps readers recognize the formative power of culture and the transformative possibilities of Christian practices. He explains that worship is the \"imagination station\" that incubates our loves and longings so that our cultural endeavors are indexed toward God and his kingdom. This is why the church and worshiping in a local community of believers should be the hub and heart of Christian formation and discipleship. Following the publication of his influential work Desiring the Kingdom, Smith received numerous requests from pastors and leaders for a more accessible version of that book's content. No mere abridgment, this new book draws on years of Smith's popular presentations on the ideas in Desiring the Kingdom to offer a fresh, bottom-up rearticulation. The author creatively uses film, literature, and music illustrations to engage readers and includes new material on marriage, family, youth ministry, and faith and work. He also suggests individual and communal practices for shaping the Christian life.","pageCount":224,"coverImageURL":"http://books.google.com/books/content?id=dw8_CgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api","printType":"BOOK","isbn10":null,"isbn13":null,"otherIdType":null,"authors":[{"firstName":"James K. A. Smith","middleName":null,"lastName":null}],"categories":[{"name":"Religion"}]},{"title":"The Audacity of Hope","publisher":"Crown","publishedDate":"2006","description":"In July 2004, Barack Obama electrified the Democratic National Convention with an address that spoke to Americans across the political spectrum. One phrase in particular anchored itself in listeners’ minds, a reminder that for all the discord and struggle to be found in our history as a nation, we have always been guided by a dogged optimism in the future, or what Obama called “the audacity of hope.” The Audacity of Hope is Barack Obama’s call for a different brand of politics—a politics for those weary of bitter partisanship and alienated by the “endless clash of armies” we see in congress and on the campaign trail; a politics rooted in the faith, inclusiveness, and nobility of spirit at the heart of “our improbable experiment in democracy.” He explores those forces—from the fear of losing to the perpetual need to raise money to the power of the media—that can stifle even the best-intentioned politician. He also writes, with surprising intimacy and self-deprecating humor, about settling in as a senator, seeking to balance the demands of public service and family life, and his own deepening religious commitment. At the heart of this book is Barack Obama’s vision of how we can move beyond our divisions to tackle concrete problems. He examines the growing economic insecurity of American families, the racial and religious tensions within the body politic, and the transnational threats—from terrorism to pandemic—that gather beyond our shores. And he grapples with the role that faith plays in a democracy—where it is vital and where it must never intrude. Underlying his stories about family, friends, and members of the Senate is a vigorous search for connection: the foundation for a radically hopeful political consensus. A public servant and a lawyer, a professor and a father, a Christian and a skeptic, and above all a student of history and human nature, Barack Obama has written a book of transforming power. Only by returning to the principles that gave birth to our Constitution, he says, can Americans repair a political process that is broken, and restore to working order a government that has fallen dangerously out of touch with millions of ordinary Americans. Those Americans are out there, he writes—“waiting for Republicans and Democrats to catch up with them.” From the Hardcover edition.","pageCount":320,"coverImageURL":"http://books.google.com/books/content?id=k85pcYttpW0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api","printType":"BOOK","isbn10":null,"isbn13":null,"otherIdType":null,"authors":[{"firstName":"Barack","middleName":null,"lastName":"Obama"}],"categories":[{"name":"Biography & Autobiography"}]},{"title":"Of Thee I Sing","publisher":"Knopf Books for Young Readers","publishedDate":"2010","description":"In this tender, beautiful letter to his daughters, President Barack Obama has written a moving tribute to thirteen groundbreaking Americans and the ideals that have shaped our nation. From the artistry of Georgia O'Keeffe, to the courage of Jackie Robinson, to the patriotism of George Washington, President Obama sees the traits of these heroes within his own children, and within all of America’s children. Breathtaking, evocative illustrations by award-winning artist Loren Long at once capture the personalities and achievements of these great Americans and the innocence and promise of childhood. This beautiful book celebrates the characteristics that unite all Americans, from our nation’s founders to generations to come. It is about the potential within each of us to pursue our dreams and forge our own paths. It is a treasure to cherish with your family forever. From the Hardcover edition.","pageCount":40,"coverImageURL":"http://books.google.com/books/content?id=B6YCffPQR-cC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api","printType":"BOOK","isbn10":null,"isbn13":null,"otherIdType":null,"authors":[{"firstName":"Barack","middleName":null,"lastName":"Obama"}],"categories":[{"name":"Juvenile Nonfiction"}]},{"title":"The Essential Calvin And Hobbes","publisher":"Andrews McMeel Publishing","publishedDate":"1988","description":"The Essential Calvin and Hobbes is an over-size anthology-type book including an original 16-page story and color Sunday cartoons.","pageCount":254,"coverImageURL":"http://books.google.com/books/content?id=JuDInK3YtyMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api","printType":"BOOK","isbn10":null,"isbn13":null,"otherIdType":null,"authors":[{"firstName":"Bill","middleName":null,"lastName":"Watterson"}],"categories":[{"name":"Comics & Graphic Novels"}]}];
      this.bookDTOArray = this.toRead = sampleLibraryBooks;
      localStorage.setItem('books', JSON.stringify(sampleLibraryBooks));
      this.isLoading = false;
    }
  }

  dragStarted() {
    this.dragging = true;
  }

  dragEnded() {
    this.dragging = false;
    this.inToReadZone = this.inReadingZone = this.inDoneZone = this.inRemoveZone = false;
  }

  enteredToReadZone() {
    this.inToReadZone = true;
  }

  leftToReadZone() {
    this.inToReadZone = false;
  }

  enteredReadingZone() {
    this.inReadingZone = true;
  }

  leftReadingZone() {
    this.inReadingZone = false;
  }

  enteredDoneZone() {
    this.inDoneZone = true;
  }

  leftDoneZone() {
    this.inDoneZone = false;
  }

  enteredRemoveZone() {
    this.inRemoveZone = true;
  }

  leftRemoveZone() {
    this.inRemoveZone = false;
  }

  openDialog(bookDTO: BookDTO) {
    this.dialogService.openBookDetailsDialog(bookDTO, 'EXPLORE_VIEW');
  }
}
