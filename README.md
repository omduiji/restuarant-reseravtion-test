# restuarant-reseravtion-test

## Steps to run: 

- clone the repo
- npm install
- npm run dev
- open the localhost port shown in terminal

## Application Documentation:

### Assumptions 

1. User can view past and upcoming reservations, the data provided held past dates in 2018, so it means there will be no upcoming reservations, Solution: I assumed that we are on Aug 10, 2018 in order to be able to filter data based on time.

2. User can sort based on guest number, there was no guest number inside the data given, So I assumed it maybe a typo and it should be guests number, but also no data found referring to that, So I assumed that quantity represents the number of seats or guests and sort based on that assumption.

3. User can filter by area, unlike shifts and status task didn't provide any details of what are the limited areas, I assume that in real world this can't be figured easily as restaurants can have different areas depending on its space, So I make it a text input and search inside area property, if the user enter comma separated text this will allow him to search different areas.

4. User can search with first and last names, I went for trie-prefix algorithm, It may be over engineering, But I assumed that there maybe large sets of data not just 20 records, In case of small amount of data I will go for linear search using filter methods to achieve the save purpose.

5. There was no clarifications about responsiveness so I tried my best to provide smooth experience, Also tried to use color pallet similar to the one used in Yassir.

6. I chose to display reservations in card not a table cause I thought will be easier for the user to detect changes with filters in card preview, Also cards have preview mode and if user clicks on them they expand showing all details they have.

