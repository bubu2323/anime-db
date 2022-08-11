<?php
include_once("key.php")
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Anime app</title>
    <!-- font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap" rel="stylesheet">
    <!-- css -->
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="reset.css">
</head>

<body>
    <div class="container-wrapper">
        <span id="error"></span>
        <nav>
            <!-- <ul>
                <li>Home</li>
                <li>Random film</li>
            </ul> -->
            <div class="form__group">
                <form method="get">
                    <label for="anime" class="form__label">Search anime by title:</label>
                    <input type="text" class="form__field w-100 search" placeholder="Assassination Classroom">
                </form>
            </div>
        </nav>
        <div class="windowResult">
            <div id="list"></div>
        </div>

        <h1 class="title">Most popular anime</h1>
        <hr>
        <div class="showFilms">
            <div class="loader">Loading...</div>
        </div>
        <div class="flex buttonsShow">
            <div class="rndContainer">
                <button class="rose-btn randomPageBtn">show random anime</button>
            </div>
            <div class="rndContainer">
                <button class="rose-btn popularBtn ">show popular anime</button>
            </div>
        </div>
    </div>

    <dialog id="modal">
        <div class="container-modal">
            <img src="" class="img-modal" alt="">
            <h2 class="title-modal">Title</h2>
            <h3 class="genres-modal">genres</h3>
            <h4 class="status-modal">Status</h4>
            <p class="description-modal"></p>
            <button class="close rose-btn">Close</button>
        </div>
    </dialog>

    <footer class="end">
        <div class="footer-content">
            <div>
                <p>Developed with <span id="heart">&hearts;</span> by <a href="#">Carolina Tronci</a></p>
            </div>
        </div>
    </footer>
    <script>
        const API_KEY = <?php echo json_encode($API_KEY) ?>;
    </script>
    <script src="script/script.js"></script>
    <script src="script/search.js"></script>
</body>

</html>